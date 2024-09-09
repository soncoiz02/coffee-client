export const CONSTANTS: any = {
    CUSTOM_STYLE_PROPERTY: {
        hoverBg: 'rgba(145, 158, 171, 0.08)',
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
    },
    LOCAL_OPTIONS: {
        UNIT_OPTIONS: [
            {
                label: "Mililit (ml)",
                value: "ml",
            },
            {
                label: "Lít (l)",
                value: "l",
            },
            {
                label: "Gram (g)",
                value: "gram",
            },
            {
                label: "Kilogram (kg)",
                value: "kg",
            },
            {
                label: "Cái/Chiếc",
                value: "pcs",
            }
        ],
        INGREDIENT_CATEGORY_OPTIONS: [
            {
                label: "Nguyên liệu pha chế",
                value: "ingredient",
            },
            {
                label: "Topping",
                value: "topping",
            }
        ]
    },
    GRID_COL_NAME: {
        INGREDIENT: {
            name: "Tên nguyên liệu",
            quantity: "Định lượng",
            unit: "Đơn vị định lượng",
            category: "Danh mục",
            status: "Trạng thái"
        }
    }
}