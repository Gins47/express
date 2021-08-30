const { models } = require("../../sequelize");
const { getIdParam } = require("../helpers");
const { Op } = require("sequelize");

async function getAll(req, res) {
	console.log(`Executing getALL`);
	const startedDate = new Date(new Date() - 64 * 60 * 60 * 1000);
	const endDate = new Date();
	console.log(
		`startedDate = ${startedDate.toISOString()} endDate = ${endDate.toISOString()}`
	);
	const users = await models.user.findAll({
		where: {
			createdAt: {
				[Op.lt]: new Date(),
				[Op.gt]: new Date(new Date() - 128 * 60 * 60 * 1000),
			},
		},
	});
	res.status(200).json(users);
}

async function getUsersByRange(req, res) {
	console.log(`Inside getUsersByRange`);
	const startDate = new Date(req.query.startDate);
	const endDate = req.query.hasOwnProperty("endDate")
		? new Date(req.query.endDate)
		: new Date();
	console.log(
		`startDate = ${startDate.toISOString()} endDate = ${endDate.toISOString()}`
	);
	const users = await models.user.findAll({
		where: {
			createdAt: {
				[Op.lt]: endDate,
				[Op.gt]: startDate,
			},
		},
	});
	res.status(200).json(users);
}

async function getById(req, res) {
	const id = getIdParam(req);
	const user = await models.user.findByPk(id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).send("404 - Not found");
	}
}

async function create(req, res) {
	if (req.body.id) {
		res
			.status(400)
			.send(
				`Bad request: ID should not be provided, since it is determined automatically by the database.`
			);
	} else {
		await models.user.create(req.body);
		res.status(201).end();
	}
}

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.user.update(req.body, {
			where: {
				id: id,
			},
		});
		res.status(200).end();
	} else {
		res
			.status(400)
			.send(
				`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
			);
	}
}

async function remove(req, res) {
	const id = getIdParam(req);
	await models.user.destroy({
		where: {
			id: id,
		},
	});
	res.status(200).end();
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
	getUsersByRange,
};
