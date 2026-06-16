/**
 * Job model — representasi struktur tabel JOBS
 * Dipakai untuk validasi dan dokumentasi field.
 */
const JobsModel = {
  tableName: "JOBS",
  fields: {
    job_id: { type: "NUMBER", primaryKey: true },
    job_title: { type: "VARCHAR2", required: true, maxLength: 35 },
    min_salary: { type: "NUMBER", precision: 8, scale: 2 },
    max_salary: { type: "NUMBER", precision: 8, scale: 2 },
  },

  /**
   * Validasi payload input
   * @param {object} data
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate(data) {
    const errors = [];

    if (!data.job_title || String(data.job_title).trim() === "") {
      errors.push("job_title wajib diisi");
    } else if (String(data.job_title).length > 35) {
      errors.push("job_title maksimal 35 karakter");
    }

    return { valid: errors.length === 0, errors };
  },
};

module.exports = JobsModel;
