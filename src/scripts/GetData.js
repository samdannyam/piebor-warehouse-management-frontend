import axios from "axios";

export default {
  async getOptions(fields) {
    try {
      var options = {};
      const keys = Object.keys(fields);
      // console.log(fields)
      await Promise.all(
        keys.map(async (key) => {
          if (fields[key].type === "select" || fields[key].type === "svg") {
            try {
              // console.log(fields[key])
              const response = await axios.post(
                `/dynamic/${fields[key].link}s`,
              );
              options[key] = [];
              response.data.forEach((dat) => {
                if (dat.title) {
                  options[key].push(dat);
                }
              });
            } catch (error) {
              console.error(`Error fetching data for ${key}:`, error);
            }
          }
        }),
      );
      // console.log(fields)
      return options;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll(key, search) {
    var filter = search;
    if (!search) {
      filter = {};
    }
    try {
      const response = await axios.post(`/dynamic/${key}s`, filter);
      // console.log("getAll")
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getViews(key) {
    try {
      const response = await axios.post(`/getViews`, key);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
