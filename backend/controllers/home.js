// controllers/home.js

const HomePageItem = require('../models/homePageItem.model');


const getHomePageData = async (req, res) => {
  try {
    // Fetch data from MongoDB
    const homepageData = await HomePageItem.find();
    // console.log(homepageData)
    res.status(200).send(homepageData);
  } catch (error) {
    console.error('Error fetching homepage data:', error.message);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  getHomePageData,
  // postHomePageData
};
