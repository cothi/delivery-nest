import { Injectable } from '@nestjs/common';
import { IQuery } from '@nestjs/cqrs';

export class GetKakaoAuthUrlQuery implements IQuery {}
