import {
    pool
} from "../db.js"

import {
    nestJson
} from "../nesting.js"

export const getProduccion = async (req, res) => {
    try {
        const query = `
        SELECT JSON_OBJECT(
            'id', p.id,
            'fecha_inicio', p.fecha_inicio,
            'fecha_fin', p.fecha_fin,
            'estado', p.estado,
            'factura_clie_id', JSON_OBJECT(
                'id', v.id,
                'fecha', v.fecha,
                'estado', v.estado,
                'detalle_entrega', v.detalle_entrega,
                'numero_factura', v.numero_factura
                ),
            'detalles',JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', d.id,
                    'cod_producto_id', JSON_OBJECT(
                        'id',b.id,
                        'nombre', b.nombre,
                        'descripcion', b.descripcion,
                        'color', b.color,
                        'talla', b.talla,
                        'costo_produccion', b.costo_produccion,
                        'cantidad', e.cantidad
                    ),
                    'estdo_produccion_prod', d.estdo_produccion_prod
                )
            )
        ) proceso
        FROM api_models_produccion p
        JOIN api_models_venta v
        ON p.factura_clie_id = v.id
        JOIN api_models_produccion_detalle d
        ON p.id = d.produccion_id
        JOIN api_models_venta_detalle a
        ON d.cod_producto_id = a.id
        JOIN api_models_producto_variante b
        ON a.producto_id = b.id
        JOIN api_models_producto_detalle e
        ON e.variante_id = b.id
        GROUP BY p.id
                        `

        const [rows] = await pool.query(query)
        console.log(rows, '######################################')

        res.json(rows)
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
}

export const getProduccionDetail = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const query = `
        SELECT JSON_OBJECT(
            'id', p.id,
            'fecha_inicio', p.fecha_inicio,
            'fecha_fin', p.fecha_fin,
            'estado', p.estado,
            'factura_clie_id', JSON_OBJECT(
                'id', v.id,
                'fecha', v.fecha,
                'estado', v.estado,
                'detalle_entrega', v.detalle_entrega,
                'numero_factura', v.numero_factura
                ),
            'detalles',JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', d.id,
                    'cod_producto_id', JSON_OBJECT(
                        'id',b.id,
                        'nombre', b.nombre,
                        'descripcion', b.descripcion,
                        'color', b.color,
                        'talla', b.talla,
                        'costo_produccion', b.costo_produccion,
                        'cantidad', e.cantidad
                    ),
                    'estdo_produccion_prod', d.estdo_produccion_prod
                )
            )
        ) proceso
        FROM api_models_produccion p
        JOIN api_models_venta v
        ON p.factura_clie_id = v.id
        JOIN api_models_produccion_detalle d
        ON p.id = d.produccion_id
        JOIN api_models_venta_detalle a
        ON d.cod_producto_id = a.id
        JOIN api_models_producto_variante b
        ON a.producto_id = b.id
        JOIN api_models_producto_detalle e
        ON e.variante_id = b.id
        WHERE p.id = ?
        GROUP BY p.id
                        `
        const [rows] = await pool.query(query, [id])
        if (rows.affectedRows <= 0) {
            return res.status(404).json({
                message: "Produccion no encontrada"
            })
        }
        res.json(rows[0])
    } catch (e) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
}

export const postProduccion = async (req, res) => {
    try {
        const data = req.body
        console.log(data)

        const sqlProd = `INSERT INTO api_models_produccion 
                        (factura_clie_id, fecha_inicio, fecha_fin, estado) 
                        VALUES (?,?,?,?)`

        const [rows] = await pool.query(sqlProd, [data.factura_clie_id, data.fecha_inicio, data.fecha_fin, data.estado])
        data.detalles.map(item => {
            const sqlDetalle = `INSERT INTO api_models_produccion_detalle
                            (produccion_id, cod_producto_id, estdo_produccion_prod)
                            VALUES (?,?,?)`

            pool.query(sqlDetalle, [rows.insertId, item.cod_producto_id, item.estdo_produccion_prod])
        })
        res.status(201).json({
            id: rows.insertId
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: e.message
        });
    }
}

export const patchProduccion = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            fecha_inicio,
            fecha_fin,
            estado,
            factura_clie_id
        } = req.body;

        const [result] = await pool.query(
            `UPDATE api_models_produccion 
            SET fecha_inicio = IFNULL(?, fecha_inicio), fecha_fin = IFNULL(?, fecha_fin), estado = IFNULL(?, estado), factura_clie_id = IFNULL(?, factura_clie_id) 
            WHERE id = ?`,
            [fecha_inicio, fecha_fin, estado, factura_clie_id, id]
        )
        if (result.affectedRows === 0)
            return res.status(404).json({
                message: "Produccion no encontrada"
            })

        const [rows] = await pool.query("SELECT * FROM api_models_produccion WHERE id = ?", [id])
        res.json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Someting goes wrong"
        })
    }

}

export const deleteProduccion = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const detQuery = "DELETE FROM api_models_produccion_detalle WHERE produccion_id = ?"
        const [detRows] = await pool.query(detQuery, [id])
        if (detRows.affectedRows <= 0) {
            return res.status(404).json({
                message: "error al eliminar"
            })
        }
        const [rows] = await pool.query("DELETE FROM api_models_produccion WHERE id = ?", [id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({
                message: "produccion not found"
            });
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
}

export const getProduccionDetalle = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const query = `SELECT * from api_models_produccion_detalle WHERE produccion_id = ?`
        const [rows] = await pool.query(query, [id])
        if (rows.affectedRows <= 0) {
            return res.status(404).json({
                message: "Produccion no encontrada"
            })
        }
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Sometings goes wrong"
        })
    }
}

export const patchProduccionDetalle = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            cod_producto_id,
            estdo_produccion_prod
        } = req.body;

        const [result] = await pool.query(
            `UPDATE api_models_produccion_detalle 
            SET cod_producto_id = IFNULL(?, cod_producto_id), estdo_produccion_prod = IFNULL(?, estdo_produccion_prod)
            WHERE id = ?`,
            [cod_producto_id, estdo_produccion_prod, id]
        )
        if (result.affectedRows === 0)
            return res.status(404).json({
                message: "Se encontro un error al "
            })

        const [rows] = await pool.query("SELECT * from api_models_produccion_detalle WHERE produccion_id = ?", [id])
        res.json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Someting goes wrong"
        })
    }
}


export const deleteProduccionDetalle = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const detQuery = "DELETE FROM api_models_produccion_detalle WHERE id = ?"
        const [detRows] = await pool.query(detQuery, [id])
        if (detRows.affectedRows <= 0) {
            return res.status(404).json({
                message: "error al eliminar"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
}

export const getDetalle = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const query = `
                        SELECT JSON_OBJECT(
                            'cod_producto', JSON_OBJECT(
                                'id',a.id,
                                'nombre', a.nombre,
                                'descripcion', a.descripcion,
                                'color', a.color,
                                'talla', a.talla,
                                'costo_produccion', a.costo_produccion,
                                'cantidad', e.cantidad
                            ),
                            'estdo_produccion_prod', d.estdo_produccion_prod
                        ) detalle
                        FROM api_models_produccion_detalle d
                        JOIN api_models_producto_variante a
                        ON d.cod_producto_id = a.id
                        JOIN api_models_producto_detalle e
                        ON e.variante_id = a.id
                        WHERE d.id = ?
                        `
        const [rows] = await pool.query(query, [id])
        if (rows.affectedRows <= 0) {
            return res.status(404).json({
                message: "Produccion no encontrada"
            })
        }
        res.json(rows[0])
    } catch (e) {
        return res.status(500).json({
            message: "Something goes wrong"
        });
    }
}

export const postProduccionDetalle = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const sqlDetalle = `INSERT INTO api_models_produccion_detalle
                            (produccion_id, cod_producto_id, estdo_produccion_prod)
                            VALUES (?,?,?)`

        const [rows] =  await pool.query(sqlDetalle, [data.produccion_id, data.cod_producto_id, data.estdo_produccion_prod])
        res.status(201).json({
            id: rows.insertId
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: e.message
        });
    }
}