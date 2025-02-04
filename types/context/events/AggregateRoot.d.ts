import { DomainEvent } from './CreateEvent';
export declare class AggRoot {
    apply(events: DomainEvent[]): void;
}
