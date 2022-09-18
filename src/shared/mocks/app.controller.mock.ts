import type { Response } from 'express';

export class AppControllerMock {
    index(res: Response) {
        void res;
        return this.status();
    }

    status() {
        return {
            status: 'online',
            date: '2022-09-18T17:13:31.245Z',
            environment: 'development',
            aws: {
                region: 'local',
                function_version: 'local',
            },
        };
    }
}
export default new AppControllerMock();
