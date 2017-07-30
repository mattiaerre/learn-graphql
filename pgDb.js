const pgDb = (pgPool) => {
  return {
    insertRestaurant: async (resInfo) => {
      const response = await pgPool.query(
        `
        INSERT INTO restaurants (name, address, city_id)
        VALUES($1, $2, $3)
        RETURNING *
        `,
        [resInfo.name, resInfo.address, resInfo.cityId]
      );

      return response.rows[0];
    },
    fetchCities: async (cityIds) => {
      console.log(cityIds);
      const response = await pgPool.query(`
      SELECT * FROM cities WHERE id = ANY($1)
      `, [cityIds]);

      return response.rows;
    }
  };
};

module.exports = pgDb;
