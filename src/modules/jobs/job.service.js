const AppError = require("../../shared/utils/AppError");
const JobsModel = require("./job.model");
const JobRepository = require("./job.repository");

const JobService = {
  async getAll() {
    return JobRepository.findAll();
  },

  async getById(id) {
    const job = await JobRepository.findById(id);
    if (!job) {
      throw new AppError(`Job dengan ID ${id} tidak ditemukan`, 404);
    }
    return job;
  },

  async create(data) {
    const { valid, errors } = JobsModel.validate(data);
    if (!valid) throw new AppError("Validasi gagal", 422, errors);

    return JobRepository.create(data);
  },

  async update(id, data) {
    await this.getById(id);

    const { valid, errors } = JobsModel.validate(data);
    if (!valid) throw new AppError("Validasi gagal", 422, errors);

    return JobRepository.update(id, data);
  },

  async remove(id) {
    await this.getById(id);
    const deleted = await JobRepository.remove(id);
    if (!deleted) throw new AppError("Gagal menghapus department", 500);
    return { job_id: id };
  },
};

module.exports = JobService;
