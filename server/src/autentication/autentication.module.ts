import { Module } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { AutenticationController } from './autentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticationSchema } from './entities/autentication.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Autentication', schema: AutenticationSchema}
    ])
  ],
  controllers: [AutenticationController],
  providers: [AutenticationService],
  exports:[MongooseModule],
})
export class AutenticationModule {}
