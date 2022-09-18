import { StatusEnum } from '@modules/status/status.enum';
import { Injectable } from '@nestjs/common';
import type { AppServiceInterface } from 'nest-shared';

@Injectable()
export class StatusService {
    private status: StatusEnum = StatusEnum.none;

    public set Status(status: StatusEnum) {
        this.status = status;
    }
    public get Status() {
        return this.status;
    }

    public show(): Promise<typeof AppServiceInterface> {
        return Promise.resolve({
            status: this.Status,
            date: new Date(),
            environment: process.env.NODE_ENV,
            aws: {
                region: process.env.AWS_REGION || 'local',
                function_version:
                    process.env.AWS_LAMBDA_FUNCTION_VERSION || 'local',
            },
        });
    }
}
export default new StatusService();
