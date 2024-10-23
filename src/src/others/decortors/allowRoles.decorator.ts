import { SetMetadata } from '@nestjs/common';
import {ROLE_KEY} from 'src/others/constants';

export const AllowRoles = (...roles: string[]) => SetMetadata(ROLE_KEY, roles);