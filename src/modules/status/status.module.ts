import { Module } from '@nestjs/common';
import { StatusService } from '@modules/status/status.service';

@Module({
    providers: [StatusService],
    exports: [StatusService],
})
export class StatusModule {}
