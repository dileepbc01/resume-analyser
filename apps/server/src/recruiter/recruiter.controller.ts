import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateRecruiterDto } from "@repo/types";
import { AccessTokenGuard } from "src/common/guards/access-token.guard";

import { RecruiterService } from "./recruiter.service";

@UseGuards(AccessTokenGuard)
@Controller("recruiter")
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Get()
  async findAll() {
    return await this.recruiterService.findAll();
  }

  @Get(":id")
  async find(@Param("id") recruiter_id: string) {
    return await this.recruiterService.find(recruiter_id);
  }

  @Post()
  async create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return await this.recruiterService.create(createRecruiterDto);
  }
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.recruiterService.remove({
      id,
    });
  }
  async update(@Param("id") recruiter_id: string, @Body() updateRecruiterDto: Partial<CreateRecruiterDto>) {
    return await this.recruiterService.update(recruiter_id, updateRecruiterDto);
  }
}
