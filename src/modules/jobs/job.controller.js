const response = require("../../shared/utils/response");
const JobService = require("./job.service");

const JobController = {
  async index(req, res, next) {
    try {
      const data = await JobService.getAll();
      return response.success(res, data, "Daftar job berhasil diambil");
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const data = await JobService.getById(Number(req.params.id));
      return response.success(res, data, "Detail Job berhasil diambil");
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const data = await JobService.create(req.body);
      return response.success(res, data, "Job berhasil dibuat", 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await JobService.update(Number(req.params.id), req.body);
      return response.success(res, data, "Job berhasil diperbaharui");
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const data = await JobService.remove(Number(req.params.id));
      return response.success(res, data, "Job berhasil dihapus");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = JobController;
