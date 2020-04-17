export default () => ({
  newPlatforms: [],
  newCategories: [],
  newprojectType: [],
  appliedFilterObject: {
    textSearch: '',
    ecommercePlatforms: [],
    category: [],
    budgetMin: 0,
    budgetMax: 0,
    locations: [],
    projectType: []
  },
  filterObject: {
    textSearch: '',
    ecommercePlatforms: [],
    category: [],
    budgetMin: 0,
    budgetMax: 0,
    locations: [],
    projectType: []
  },
  platforms: [
    'Shopify',
    'Big Cartel',
    'Big Commerce',
    'Magento',
    'Open Cart',
    'PrestaShop',
    'Squarespace',
    'Volusion',
    'Woocommerce'
  ],
  categories: [
    'Developer',
    'Manager',
    'Designer',
    'Marketing expert',
    'Content wrinter',
    'Customer support specialist'
  ],
  projectType: [
    { value: 'OneTime', label: 'One-time project' },
    { value: 'OnGoing', label: 'Ongoing' }
  ]
})
