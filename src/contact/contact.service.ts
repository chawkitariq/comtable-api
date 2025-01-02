import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dtos/create-contact.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    public readonly contactRepository: Repository<ContactEntity>,
  ) {}

  create(dto: CreateContactDto) {
    return this.contactRepository.save(dto);
  }

  findAll(companyId: string) {
    return this.contactRepository.find({
      where: { company: { id: companyId } },
      relations: ['company', 'createdBy'],
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
