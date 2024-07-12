import LayananDataModel from "../../models/LayananDataModel.js";

export const setStatusDataLayananData = async(req, res) => {
    try {
        let rawData = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        let processedData = {...rawData };
        const notAllowedFields = ["role", "apiKey"];
        notAllowedFields.forEach((field) => {
            if (processedData.hasOwnProperty(field)) {
                delete processedData[field];
            }
        });


        if (Array.isArray(rawData.role) || typeof rawData.role === "object") {
            rawData.role = JSON.stringify(rawData.role);
        }
        rawData.apiKey = apiKey;
        rawData.fields = JSON.stringify(processedData);
        rawData.submission_status = 1;
        rawData.on_process = JSON.stringify({});
        rawData.on_validation = JSON.stringify({ status_validation: "1" });
        rawData.on_validation_technique = JSON.stringify({});
        rawData.on_finish = JSON.stringify({ submission_status: "0" });

        await LayananDataModel.create(rawData);
        res.status(200).json({
            status: "ok",
            msg: "Item created successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const editProcessDataLayananData = async(req, res) => {
    try {
        const { id, status } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const LayananDataItem = await LayananDataModel.findOne({
            where: {
                id: id,
            },
        });
        if (!LayananDataItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }
        if (parseInt(LayananDataItem.submission_status) === 1) {
            LayananDataItem.submission_status = 2;
            await LayananDataItem.save();
        } else if (parseInt(LayananDataItem.submission_status) === 4) {
            if (status === "Ditolak") {
                LayananDataItem.submission_status = 5;
            } else if (status === "Lanjutkan") {
                LayananDataItem.submission_status = 6;
            } else {
                LayananDataItem.submission_status = 4;
            }
            await LayananDataItem.save();
        }
        return res.status(200).json({
            status: "ok",
            msg: "Item updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};