import { Request } from 'express';
import developmentLogger from './development';  // Assuming this is a custom logger module

// Logger instance
const logger = developmentLogger;

// Function to get log data as a string from the request object
export const getLogDataFromReqObject = (req: Request): string => {
    try {
        if (!req) return '(request object data Not Found)';
        
        const ip = req.headers?.['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
        const userId = (req as any)?.user?._id; // TypeScript does not recognize `user` by default
        const path = req.path;
        const params = JSON.stringify(req.params);
        const query = JSON.stringify(req.query);
        
        const body = { ...req.body };
        delete body.password; // Sensitive data which should not be logged
        delete body.confirmPassword; // Sensitive data which should not be logged
        delete body.token; // Sensitive data which should not be logged
        delete body['g-recaptcha-response']; // Not needed
        
        return `IP - ${ip}, UserId - ${userId}, Path - ${path}, Body - ${JSON.stringify(body)}, Params - ${params}, Query - ${query}`;
    } catch (error) {
        logger.error(`getLogDataFromReqObject function error - ${error}`);
        return '(request object data Not Found)';
    }
};

// Interface for structured log data
export interface LogDataJSON {
    ip: string;
    userId?: string; // Marked as optional
    path: string;
    body: string;
    params: string;
    query: string;
    method: string;
}

// Function to get log data as a JSON object from the request object
export const getLogDataInJSONFromReqObject = (req: Request): LogDataJSON => {
    try {
        const ip = req.headers?.['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
        const userId = (req as any)?.user?._id; // TypeScript does not recognize `user` by default
        const path = req.path;
        const params = JSON.stringify(req.params);
        const query = JSON.stringify(req.query);
        const method = req.method;
        
        const body = { ...req.body };
        delete body.password; // Sensitive data which should not be logged
        delete body.confirmPassword; // Sensitive data which should not be logged
        delete body.token; // Sensitive data which should not be logged
        delete body['g-recaptcha-response']; // Not needed
        
        return {
            ip: ip as string,
            userId: userId as string | undefined,
            path,
            body: JSON.stringify(body),
            params,
            query,
            method
        };
    } catch (error) {
        throw new Error(`getLogDataInJSONFromReqObject function error - ${error}`);
    }
};

export default logger;
