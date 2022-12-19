import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { RejectFinanceDto } from './dto/reject-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameService } from './game.service';

@Controller('/api/games')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Post()
  createGame(@Body() data: CreateGameDto) {
    return this.gameService.createGame(data);
  }

  @Patch(':id')
  updateGame(@Body() data: UpdateGameDto, @Param('id') id: number) {
    return this.gameService.updateGame(id, data);
  }

  @Patch(':id/finances')
  updateFinances(@Body() data: UpdateFinanceDto, @Param('id') id: number) {
    return this.gameService.updateFinanceData(id, data);
  }

  @Patch(':id/status/approve')
  approveStatus(@Param('id') id: number) {
    return this.gameService.approveStatus(id);
  }

  @Patch(':id/status/reject')
  rejectStatus(@Param('id') id: number, @Body() data: RejectFinanceDto) {
    return this.gameService.rejectStatus(id, data.status);
  }

  @Patch(':id/submit')
  submitForApproval(@Param('id') id: number,){
    return this.gameService.submitForApproval(id);

  }

  @Get()
  getGames() {
    return this.gameService.getGames();
  }

  @Get(':id')
  getGame(@Param('id') id: number) {
    return this.gameService.getGame(id);
  }
}
