import type { AppServiceInterface } from 'nest-shared';

export class StatusServiceMock {
    public show(): Promise<typeof AppServiceInterface> {
        return Promise.resolve({
            status: 'online',
            date: new Date('2022-09-18T17:13:31.245Z'),
            environment: 'development',
            aws: {
                region: 'local',
                function_version: 'local',
            },
        });
    }
}
export default new StatusServiceMock();
