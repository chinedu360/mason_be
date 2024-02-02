const homeUser = {
    tags: ["Homepage"],
    description: "Homepage",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        examples: {
                            count: 0,
                        }
                    }
                }
            }
        }
    }
}

const hRouteDoc = {
        "/": {
            get: homeUser
    },
}

module.exports = hRouteDoc;