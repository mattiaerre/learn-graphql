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
    }
  };
};

module.exports = pgDb;
