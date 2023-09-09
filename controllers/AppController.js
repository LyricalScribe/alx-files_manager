const dbClient = require('../utils/db');

class AppController {
  static async getStatus(req, res) {
    const redisStatus = true;
    const dbStatus = dbClient.isAlive();

    const status = {
      redis: redisStatus,
      db: dbStatus,
    };

    res.status(200).json(status);
  }

  static async getStats(req, res) {
    try {
      const userCount = await dbClient.nbUsers();
      const fileCount = await dbClient.nbFiles();

      const stats = {
        users: userCount,
        files: fileCount,
      };

      res.status(200).json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = AppController;
