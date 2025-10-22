import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriasModule } from './materias/materias.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParaleloModule } from './paralelo/paralelo.module';
import { ProfesorModule } from './profesor/profesor.module';
import { MateriaAsignadaProfesorModule } from './materia-asignada-profesor/materia-asignada-profesor.module';
import { UnidadModule } from './unidad/unidad.module';
import { MaterialModule } from './material/material.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { NotaModule } from './nota/nota.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 🔹 Habilita el uso de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en toda la app
    }),

    // 🔹 Configura TypeORM usando las variables .env
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),

    // 🔹 Tus módulos
    MateriasModule,
    ParaleloModule,
    ProfesorModule,
    MateriaAsignadaProfesorModule,
    UnidadModule,
    MaterialModule,
    EstudianteModule,
    AsistenciaModule,
    InscripcionModule,
    NotaModule,
    AuthModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
