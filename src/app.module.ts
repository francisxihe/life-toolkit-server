import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getDatabaseConfig } from "./config/database.config";
// import { UsersModule } from "./users/users.module";
// import { AuthModule } from "./auth/auth.module";
// import { TodosModule } from "./todos/todos.module";
// import { ExpensesModule } from "./expenses/expenses.module";
import { AiModule } from "./ai/ai.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    //   useFactory: getDatabaseConfig,
    // }),
    // UsersModule,
    // AuthModule,
    // TodosModule,
    // ExpensesModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
