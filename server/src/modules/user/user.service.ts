import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/infra/db/drizzle.service';
import { NewUser, users } from 'src/infra/db/models/user.model';
@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(data: NewUser) {
    const [user] = await this.drizzle.db.insert(users).values(data).returning();

    return user;
  }
  async findBySocialId(socialId: string) {
    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.socialId, socialId));
    return user;
  }

  async findById(id: number) {
    const [result] = await this.drizzle.db
      .select({
        id: users.id,
        socialId: users.socialId,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result;
  }
}
