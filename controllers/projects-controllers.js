const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const Project = require("../models/project");

let DUMMY_PROJECTS = [
  [
    [
      "First Name",
      "Last Name",
      "Headline",
      "Location",
      "Current Title",
      "Current Company",
      "Email Address",
      "Phone Number",
      "Profile URL",
      "Active Project",
      "Notes",
      "Feedback",
    ],
    [
      "jack",
      "birdsong",
      "skilled plumber hvac carpenter",
      "Denver",
      "Journeyman Heating, Ventilation, and Air Conditioning Technician",
      "Bruce mechanic ",
      "",
      "",
      "https://www.linkedin.com/in/jack-birdsong-a134883b",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Logan",
      "Robinson",
      "Plumber at TONY V. PLUMBING & HEATING, INC",
      "Denver",
      "Plumber",
      "TONY V. PLUMBING & HEATING, INC",
      "",
      "",
      "https://www.linkedin.com/in/logan-robinson-608872212",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Daniel",
      "A.",
      "Master Medium/Heavy Truck Technician (ASE Certified)",
      "Denver",
      "Heavy Mobile Equipment Mechanic",
      "United States Space Force",
      "",
      "",
      "https://www.linkedin.com/in/daniel-a23",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Greg",
      "curran",
      "Maintenance Technician at Denver water",
      "Denver",
      "Maintenance Technician",
      "Denver water",
      "",
      "",
      "https://www.linkedin.com/in/greg-curran-918068106",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Louie",
      "Anglo Jr",
      "Journeyman plumber",
      "Denver",
      "Senior plumber",
      "City and County of Denver",
      "",
      "",
      "https://www.linkedin.com/in/louie-anglo-jr-b1b492171",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Brian",
      "McCoy",
      "Sr BMET / ISE",
      "Denver Metropolitan Area",
      "Imaging Service Engineer",
      "CommonSpirit Health",
      "",
      "",
      "https://www.linkedin.com/in/brian-mccoy-91054065",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "John",
      "Eastridge II",
      "Biomedical Engineer",
      "Denver",
      "Biomedical Equipment Technician",
      "RENOVO Solutions",
      "",
      "",
      "https://www.linkedin.com/in/john-eastridge-ii-770864195",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Julian",
      "Meisner IV",
      "Senior Maintenance Technician at Camden Property Trust-US Army Veteran",
      "Denver",
      "Senior Maintenance Technician",
      "Camden Property Trust",
      "",
      "",
      "https://www.linkedin.com/in/julianmeisner",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Robert",
      "Sprague",
      "Plumber at rotorooter denver ",
      "Denver Metropolitan Area",
      "Plumber",
      "Roto-Rooter Plumbing and Drain Service",
      "",
      "",
      "https://www.linkedin.com/in/robert-sprague-8a28b0154",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Bill",
      "Howard",
      "Skilled in New construction Plumbing as well as renovation and service. Experience running a variety of water piping systems, Copper, Pex etc. Also skilled in the running of residential DWV systems.",
      "Denver Metropolitan Area",
      "Residential Plumber",
      "Canyon Plumbing",
      "",
      "",
      "https://www.linkedin.com/in/bill-howard-043235188",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Kevin",
      "Bertram-Render",
      "Plumber",
      "Denver",
      "Apprentice Plumber",
      "Bates Mechanical, Inc.",
      "",
      "",
      "https://www.linkedin.com/in/kevin-bertram-render-9731b6151",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Chris",
      "Sing",
      "Master Plumber at Applewood Plumbing Heating & Electric",
      "Denver",
      "Master Plumber",
      "Applewood Plumbing Heating & Electric",
      "",
      "",
      "https://www.linkedin.com/in/chris-sing-013946142",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Andrew",
      "Romero",
      "Maintenance Technician",
      "Englewood",
      "Maintenance Technician",
      "Meadow Gold Dairies",
      "",
      "",
      "https://www.linkedin.com/in/andrew-romero-70052415b",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Jason",
      "Bandy",
      "Plumber at RK Mechanical",
      "Denver",
      "Plumber",
      "Searching",
      "",
      "",
      "https://www.linkedin.com/in/jasonbandykarma",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Lue",
      "Lor",
      "Assembler",
      "Denver",
      "Maintenance Technician",
      "Medtronic",
      "",
      "",
      "https://www.linkedin.com/in/lue-lor-97a725159",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Darvi",
      "Olivares",
      "A&P Mechanic",
      "Littleton",
      "Maintenance Technician",
      "MHCD",
      "",
      "",
      "https://www.linkedin.com/in/darvi-olivares-097b39135",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Alex",
      "Montgomery",
      "Sales Support Representative",
      "Littleton",
      "Sales Support Representative",
      "AEE Solar",
      "",
      "",
      "https://www.linkedin.com/in/alex-montgomery-67448a15b",
      "Installer - Littleton, CO (replied)",
      "",
      "",
    ],
    [
      "Brandon",
      "Sweet",
      "plumber @ Wheatridge Plumbing & Heating",
      "Littleton",
      "Plumber",
      "Wheatridge Plumbing & Heating",
      "",
      "",
      "https://www.linkedin.com/in/brandon-sweet-1aa262a9",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Josue",
      "Flores",
      "Plumber at RK",
      "Denver",
      "Plumber",
      "Trautman & Shreve, Inc",
      "",
      "",
      "https://www.linkedin.com/in/josue-flores-3250051a0",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Connor",
      "Brady",
      "Plumber at AAA Service Plumbing",
      "Denver",
      "Plumber",
      "AAA Service Plumbing, Heating, and Electric",
      "",
      "",
      "https://www.linkedin.com/in/connor-brady-575a9189",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Joseph",
      "Calimpong",
      "Facilities Management Hi Performance Carwash II",
      "Denver Metropolitan Area",
      "Carwash Maintenance Tech",
      "Hi Performance Car Wash",
      "",
      "",
      "https://www.linkedin.com/in/joseph-calimpong-70574969",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Tyler",
      "Hudziec",
      "HVAC Specialist",
      "Denver Metropolitan Area",
      "Heating Air Conditioning Specialist",
      "Denver Public Library",
      "",
      "",
      "https://www.linkedin.com/in/tyler-hudziec-b322271a2",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Deon",
      "G.",
      "Maintenance Technician at Property pros ",
      "Denver",
      "",
      "",
      "",
      "",
      "https://www.linkedin.com/in/deon-g-575bb7245",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Tommy",
      "Carrillo",
      "--",
      "Denver",
      "Maintenance Technician",
      "Property Maintenance & Management Services Ltd.",
      "",
      "",
      "https://www.linkedin.com/in/tommy-carrillo-258b00245",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
    [
      "Jose",
      "Saenz",
      "Licensed apprentice plumber at CHS Plumbing",
      "Denver Metropolitan Area",
      "Licensed apprentice plumber",
      "CHS Plumbing",
      "",
      "",
      "https://www.linkedin.com/in/jose-saenz-131a96193",
      "Installer - Littleton, CO (contacted)",
      "",
      "",
    ],
  ],
];

const getProjectById = async (req, res, next) => {
  const projectId = req.params.pid;
  let project;

  try {
    project = await Project.findById(projectId);
  } catch (err) {
    const error = new Error(
      "Something went wrong. Could not find that place.",
      500
    );
    return next(error);
  }

  if (!project) {
    const error = new Error(
      "Could not find a project for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ project: project.toObject({ getters: true }) });
};

const getProjectsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let projects;
  try {
    projects = await Project.find({ creator: userId });
  } catch (err) {
    const error = new Error(
      "Could not find projects for current user. Please try again.",
      500
    );
    return next(error);
  }

  if (!projects || projects.length === 0) {
    return next(
      new Error("Could not find projects for the provided user id.", 404)
    );
  }

  res.json({
    projects: projects.map((project) => project.toObject({ getters: true })),
  });
};

const createProject = async (req, res, next) => {
  const project = req.body;

  const createdProject = new Project({
    project,
  });

  try {
    await createdProject.save();
  } catch (err) {
    const error = new Error("Created project failed. Please try again.", 500);
    return next(error);
  }

  res.status(201).json({ project: createdProject });
  // console.log(req.body);
};

const updateProject = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const projectId = req.params.pid;

  const updatedproject = { ...DUMMY_PROJECTS.find((p) => p.id === projectId) };
  const projectIndex = DUMMY_PROJECTS.findIndex((p) => p.id === projectId);
  updatedproject.title = title;
  updatedproject.description = description;

  DUMMY_PROJECTS[projectIndex] = updatedproject;

  res.status(200).json({ project: updatedproject });
};

const deleteProject = async (req, res, next) => {
  const projectId = req.params.pid;

  let project;

  try {
    project = Project.findById(projectId);
  } catch (err) {
    const error = new Error("Could not find that place. Try again.", 500);
    return next(error);
  }

  try {
    await project.remove();
  } catch (err) {
    const error = new Error("Could not find that place. Try again.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted project." });
};

exports.getProjectById = getProjectById;
exports.getProjectsByUserId = getProjectsByUserId;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
