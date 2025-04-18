import { plainToInstance } from "class-transformer";
import { IsEnum, IsInt, IsString, Max, Min, validateSync } from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @Min(3)
  NODE_ENV: Environment;
  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number;
  @IsString()
  MONGO_URI: string;
  @IsString()
  ALLOWED_ORIGINS: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
