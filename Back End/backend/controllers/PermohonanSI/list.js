import PermohonanSI from "../../models/PermohonanSI.js";

export const getListDataPermohonanSI = async(req, res) => {
    try {
        const { role } = req.body;
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        } else {
            const permohonanSI = await PermohonanSI.findAll();
            permohonanSI.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const filteredpermohonanSI = permohonanSI.filter((item) => {
                if (!item.role) return false;
                const itemRoles = JSON.parse(item.role);
                return itemRoles.includes(role);
            });

            if (role === "perangkat_daerah") {
                const validpermohonanSI = filteredpermohonanSI.filter(
                    (item) => item.apiKey === apiKey
                );

                if (validpermohonanSI.length === 0) {
                    return res.status(200).json({
                        status: "error",
                        msg: "Item not found",
                    });
                }

                const totalItemsByStatus = {
                    divalidasi: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 2 || user.submission_status === 4
                    ).length,
                    diproses: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 6
                    ).length,
                    ditolak: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 3 || user.submission_status === 5 || user.submission_status === 8
                    ).length,
                    disetujui: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 7
                    ).length,
                };
                res.json({
                    status: "ok",
                    msg: "Data permohonanSI retrieved successfully",
                    data: validpermohonanSI.map((item) => {
                        const fields = JSON.parse(item.fields);
                        return {
                            id: item.id,
                            name_pic: fields.name_pic,
                            submission_title: item.submission_title,
                            submission_status: item.submission_status,
                            createdAt: item.createdAt,
                        };
                    }),
                    totalItems: validpermohonanSI.length,
                    totalItemsByStatus: totalItemsByStatus,
                });
            } else {
                const totalItemsByStatus = {
                    divalidasi: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 2 || user.submission_status === 4
                    ).length,
                    diproses: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 6
                    ).length,
                    ditolak: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 3 || user.submission_status === 5 || user.submission_status === 8
                    ).length,
                    disetujui: filteredpermohonanSI.filter(
                        (user) => user.submission_status === 7
                    ).length,
                };
                res.json({
                    status: "ok",
                    msg: "Data permohonanSI retrieved successfully",
                    data: filteredpermohonanSI.map((item) => {
                        const fields = JSON.parse(item.fields);
                        return {
                            id: item.id,
                            name_pic: fields.name_pic,
                            submission_title: item.submission_title,
                            submission_status: item.submission_status,
                            createdAt: item.createdAt,
                        };
                    }),
                    totalItems: filteredpermohonanSI.length,
                    totalItemsByStatus: totalItemsByStatus,
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};