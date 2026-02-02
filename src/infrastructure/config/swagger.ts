import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SocialPhoto API',
            version: '1.0.0',
            description: 'GDG SocialPhoto Backend API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        // Rotaları doğrudan burada JSON olarak tanımlıyoruz (YAML hatası almazsın)
        paths: {
            "/auth/register": {
                post: {
                    tags: ["Auth"],
                    summary: "Yeni kullanıcı kaydı",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", example: "yusuf_dev" },
                                        email: { type: "string", example: "yusuf@example.com" },
                                        password: { type: "string", example: "123456" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: "Başarılı" },
                        400: { description: "Hatalı istek" }
                    }
                }
            },
            "/auth/login": {
                post: {
                    tags: ["Auth"],
                    summary: "Giriş yap",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string", example: "yusuf@example.com" },
                                        password: { type: "string", example: "123456" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Giriş yapıldı" },
                        401: { description: "Yetkisiz" }
                    }
                }
            },
            "/auth/me": {
                get: {
                    tags: ["Auth"],
                    summary: "Profil bilgilerim",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: "Başarılı" }
                    }
                }
            }
        }
    },
    apis: [], // Artık dışarıdan dosya taramasına gerek kalmadı
};

export const swaggerSpec = swaggerJSDoc(options);