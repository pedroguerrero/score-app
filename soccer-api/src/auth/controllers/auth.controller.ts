import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { SingInResponse } from '../responses/sign-in.response';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User created.',
  })
  @ApiConflictResponse({
    description: 'Username already exists',
  })
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentialsDto);
  }

  @ApiOkResponse({
    description: 'Successful login.',
    type: SingInResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Please check your credentials.',
  })
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SingInResponse> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
