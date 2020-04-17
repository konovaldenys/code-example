# STORE

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

General rules of using Vuex.

1. Using modules mode with namespaced = true

2. Naming

    State: camelCase ( jobsList, someName )

    Getters: camelCase always starts with 'get' ( getFirstItem, getSomeValue )

    Mutations: uppercase SNAKE_CASE always starts with 'SET' ( SET_JOBS_LIST, SET_SOME_VARIABLE )

    Actions: uppercase SNAKE_CASE ( REMOVE_SOME_VALUE, TRANSFORM_SOME_VARIABLE )

3. State and Getters

    When we use variable from store without modifying - use 'state' inside store or component. Don't
    create 'getter' for it.

    If we need to modify variable from store always use 'getter'.

    Example:

        // STATE:

        export default () => ({
            someText: 'some test text'
        })

        // GETTERS:

        export default {
            getSomeText: (state) => state.someText; // Unnecessary getter

            getFirstWordFromText: (state) => state.someText.split(' ')[0]; // Useful getter
        }

4. Using Vuex inside components

    Use mapping functions. It's more clearly demonstrates the connection of the component with the store.

    Example:

        // COMPONENT:

        <script>
            import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

            export default {
                computed: {
                    ...mapState('moduleName' [
                        'someStoreVariable',
                        'anotherStoreVariable'
                    ]),
                    ...mapGetters('moduleName', {
                        name: 'getSomeTransformedValue',
                        age: 'getAnotherTransformedValue'
                    }),

                    // other computed properties
                },
                methods: {
                    ...mapMutations('moduleName', [
                        'SET_SOME_VARIABLE',
                        'SET_ANOTHER_VARIABLE'
                    ]),
                    ...mapActions('moduleName', [
                        'REMOVE_LAST_JOB',
                        'ADD_SOME_DATA'
                    ]),

                    // other methods

                    handleclick() {
                        this.ADD_SOME_DATA(data);
                    }
                }
            }

