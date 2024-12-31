import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dtos/create-contact.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    public readonly contactRepository: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto) {
    return this.contactRepository.save(dto);
  }

  findAll(companyId: string) {
    return this.contactRepository.find({
      where: { company: { id: companyId } },
    });
  }

  findOne(id: string) {
    return this.contactRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateContactDto) {
    return this.contactRepository.update(id, dto);
  }

  remove(id: string) {
    return this.contactRepository.softDelete(id);
  }
}
