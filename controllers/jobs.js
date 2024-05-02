const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

const handleNotFound = (resourceName) => {
  throw new NotFoundError(`No ${resourceName} found`);
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    job ? res.status(StatusCodes.OK).json({ job }) : handleNotFound("job");
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id: jobId } = req.params;
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true }
    );
    updatedJob ? res.status(StatusCodes.OK).json({ job: updatedJob }) : handleNotFound("job");
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id: jobId } = req.params;
    const deletedJob = await Job.findOneAndDelete({
      _id: jobId,
      createdBy: userId,
    });
    deletedJob ? res.status(StatusCodes.OK).json({ message: "Job deleted successfully" }) : handleNotFound("job");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
