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
      const response = await pgPool.query(`
      SELECT * FROM cities WHERE id = ANY($1)
      `, [cityIds]);

      return response.rows;
    },
    fetchResources: async () => {
      const resp = await pgPool.query(
        `
        select id, name, 'restaurant' as type from restaurants
        UNION
        select id, name, 'city' as type from cities
      `
      );

      return resp.rows;
    },
  };
};

module.exports = pgDb;
