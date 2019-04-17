const store = new Vuex.Store({
    strict: true,
    state: {
        startGame: false,
        fieldSize: 10,
        generalData: [],
        colors: ['red','green','yellow','blue','purple', 'pink', 'aqua'],
        isMovePossible: true,
        ball_path: [],
        balls_to_delete: [],
        score: 0,
    },
    getters: {
        get_empty_cells_indexes: state => {
            let empty_cells = state.generalData.filter(obj => obj.name == 'empty');
            let indexes = [];
            empty_cells.forEach(cell => {
                indexes.push(cell.index);
            });
            return indexes;
        },
        get_active_ball: state => {
            let active =  state.generalData.filter(obj => obj.status == 'active');
            return active[0];
        },
        get_array_of_names: state => state.generalData.map(el => el.name),

    },
    mutations: {
        SET_GENERAL_DATA (state, object) {
            state.generalData = object;
        },
        SET_CIRCLE_NAME (state, object) {
            state.generalData[object.index].name = object.name;
        },
        SET_CIRCLE_STATUS (state, object) {
            state.generalData[object.index].status = object.status;
        },
        SET_MOVE_POSSIBLE_TRUE ( state ) {
            state.isMovePossible = true;
        },
        SET_MOVE_POSSIBLE_FALSE ( state ) {
            state.isMovePossible = false;
        },
        SET_BALL_PATH ( state, array ) {
            state.ball_path = array;
        },
        SET_BALLS_TO_DELETE (state, array) {
            state.balls_to_delete = array;
        },
        SET_SCORE (state, new_points) {
            state.score += new_points;
        }

    },
    actions: {
        CREATE_CIRCLE({ commit, getters, state }) {
            let empty_cells_indexes = getters['get_empty_cells_indexes'];
            let index = empty_cells_indexes[Math.floor(Math.random()*(empty_cells_indexes.length))];
            let name = state.colors[Math.floor(Math.random()*(state.colors.length))];
            commit('SET_CIRCLE_NAME', {index, name});
        },

        CREATE_FEW_CIRCLES({ dispatch }, amount) {
            for (let i = 0; i < amount; i++ ) {
                dispatch('CREATE_CIRCLE');
            }
        },

        FIND_WAY({getters, state, commit}, payload) {
            const {start_position, end_position} = payload;
            const field_size = state.fieldSize;
            const current_cells = state.generalData;
            const adjacent_cells = [1, -1, 10, -10];
            let find_array = [];
            for (let i = 0; i < Math.pow(field_size, 2); i++) {
                current_cells[i].name === 'empty' ? find_array.push(false) : find_array.push(true);
            };
            find_array[start_position] = 0;

            let currentMark = 0;
            let marksCount;
            do {
                marksCount = 0;
                let current_step_cells = [];
                var idx = find_array.indexOf(currentMark);
                while (idx != -1) {
                    current_step_cells.push(idx);
                    idx = find_array.indexOf(currentMark, idx + 1);
                }
                current_step_cells.forEach((index) => {
                    adjacent_cells.forEach(step => {
                        let index_for_checking = index + step;
                        if (index_for_checking < 0 || index_for_checking >= Math.pow(field_size, 2)) return;

                        if (find_array[index_for_checking] === false) {
                            find_array[index_for_checking] = currentMark + 1;
                            marksCount += 1;
                        };
                    })
                })
                currentMark+=1;
            } while (marksCount > 0);

            let end_position_search_index = find_array[end_position];

            console.log(end_position_search_index);

            // Ищм кратчайший путь до финальной точки

            // Если ход физически возможен
            if (end_position_search_index) {
                let path_search_index = end_position_search_index;
                let path_position = end_position;
                let path_array = [];

                while ( path_search_index != 1) {
                    for ( let i = 0 ; i < adjacent_cells.length; i++ ) {
                        let position = path_position + adjacent_cells[i];
                        if (position < 0 || position >= Math.pow(field_size, 2)) return;
                        if (find_array[position] === path_search_index - 1) {
                            path_search_index -= 1;
                            path_position = position;
                            path_array.push(position);
                            break;
                        }
                    }
                };

                path_array.reverse();
                
                commit('SET_MOVE_POSSIBLE_TRUE');
                commit('SET_BALL_PATH', path_array);
            } else {
                commit('SET_MOVE_POSSIBLE_FALSE');
            }
        },

        CLICK_CELL({ commit, dispatch, state, getters }, index) {
            let cell = state.generalData[index];
            // Имя клетки на которую мы кликнули (empty || some_color)
            let new_name = cell.name;
            // Шарик готовый совершить ход в выбранную клетку
            let active_ball = getters.get_active_ball;
            // Усли активный шарик существует
            if (active_ball) {
                let old_index = active_ball.index;
                let old_name = active_ball.name;
                // Делаем активный шарик неактивным так как мы уже кликнули на другу
                commit('SET_CIRCLE_STATUS', {index: old_index, status: 'passive'});
                // Если мы нажали НЕ на активный шарик, а на любую другую клетку
                if (index != old_index) {
                    // Если эта нажатая клетка пустая, перемещаем туда активный шарик
                    if (new_name == 'empty') {
                        //Проверка возможности переместить шарик
                        dispatch('FIND_WAY', {start_position: old_index, end_position: index})
                        // если ход возможен
                        if (state.isMovePossible) {
                            commit('SET_CIRCLE_NAME', {index, name: old_name});
                            commit('SET_CIRCLE_NAME', {index: old_index, name: 'empty'});
                            dispatch('CHECK_LINE');
                            dispatch('DELETE_BALLS');
                        }
                    // Если мы нажали на другой шарик - мы делаем активным новый шарик
                    } else {
                        commit('SET_CIRCLE_STATUS', {index: index, status: 'active'});
                    }
                }
            } else {
                if (new_name != 'empty') commit('SET_CIRCLE_STATUS', {index, status: 'active'});
            }
        },
        CHECK_LINE({ state, getters, commit }) {
            const field_size = state.fieldSize;
            let balls_to_delete = [];
            const names = getters['get_array_of_names'];
            // Все фигуры - линии и диагонали. Должны быть вынесены в стор. Можно дать пользователюправо выбирать потом
            const figures = [[1,2,3,4], [-1,-2,-3,-4], [11,22,33,44], [-11,-22,-33,-44], [10,20,30,40], [-10,-20,-30,-40]];
            // Перебираем каждую клетку
            names.forEach((name, index) => {
                // Если клетка пустая мы ее пропускаем
                if (name === 'empty') return;
                // Проверяем входит ли данная клетка в какую-либо готовую фигуру
                figures.forEach(figure => {
                    // Объект, собирающий в себя имена клеток в фигуре
                    let figure_names = {};
                    // Заносим в объект цвет клетки с которой сравниваем
                    figure_names[name] = true;
                    // Проверяем каждую клетку входящую в фигуру
                    for (let i = 0; i < figure.length; i ++ ) {
                        let new_index = index + figure[i];
                        let check_name = names[new_index];
                        // Если клетка выходит за пределы поля либо является пустой прекращаем проверку фигуры
                        // И переходим к следующей
                        if (new_index < 0 || new_index >= field_size ** 2 || check_name === 'empty') return;
                        figure_names[check_name] = true;
                    };
                    // Если вся фигура состоит из элементов одного цвета
                    if (Object.keys(figure_names).length === 1) {
                        console.log('fire ' + name);
                        // К списку индексов для удаления добавляем индексы каждой клетки фигуры
                        balls_to_delete = [...balls_to_delete, ...figure.map(el => el + index)];
                        console.log('balls_to_delete = ' + balls_to_delete);
                    }
                })
            });
            let balls_to_delete_obj = {};
            // Делаем элементы массива индексов для удаления уникальнымы
            balls_to_delete.forEach(el => balls_to_delete_obj[el] = true);
            balls_to_delete = Object.keys(balls_to_delete_obj);
            console.log('balls_to_delete = ' + balls_to_delete);
            commit('SET_BALLS_TO_DELETE', balls_to_delete);
        },
        DELETE_BALLS({state, commit}) {
            let general_data = JSON.parse(JSON.stringify(state.generalData));
            let balls_to_delete = JSON.parse(JSON.stringify(state.balls_to_delete));
            if (balls_to_delete.length > 0) {
                balls_to_delete.forEach(index => general_data[index]['name'] = 'empty');
                commit('SET_GENERAL_DATA', general_data);
                commit('SET_SCORE', balls_to_delete.length * 2);
                commit('SET_BALLS_TO_DELETE', []);
            }
        }
    },
});