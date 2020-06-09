import Project from "../models/Project";

export async function getProjects(req, res) {
    try {
        const projects = await Project.findAll();
        res.json({
            data: projects
        });
    } catch (e) {
        console.log(e);
    }
}

export async function createProject(req, res) {
    const { name, priority, description, deliverydate } = req.body;
    try {
        let newProject = await Project.create({
            name,
            priority,
            description,
            deliverydate
        }, {
            fields: ['name', 'priority', 'description', 'deliverydate']
        });
        if (newProject) {
            return res.json({
                message: 'Project created successfully!',
                data: newProject
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error...Project was not created',
            data: {}
        });
    }
}

export async function getOneProject(req, res) {
    try {
        const { id } = req.params;
        const project = await Project.findOne({
            where: {
                id
            }
        });
        res.json({
            data: project
        });
    } catch (e) {
        console.log(e);
    }
}

export async function deleteProject(req, res) {
    try {
        const { id } = req.params;
        const deleteRowCount = await Project.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'Project deleted successfully!',
            count: deleteRowCount
        });
    } catch (e) {
        console.log(e);
    }
}

export async function updateProject(req, res) {
    const { id } = req.params;
    const { name, priority, description, deliverydate } = req.body;
    try {

        const project = await Project.findOne({
            attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
            where: {
                id
            }
        });

        const updatedProject = await project.update({
            name,
            priority,
            description,
            deliverydate
        },
        {
            where: { id }
        });

        return res.json({
            message: 'Project updated successfully!',
            data: updatedProject
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error...Project was not updated',
            data: {}
        });
    }
}