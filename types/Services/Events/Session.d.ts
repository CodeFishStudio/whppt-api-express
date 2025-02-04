import { ContextType } from '../../context/Context';
import { DomainEvent } from './CreateEvent';
import { AggRoot } from './AggregateRoot';
export declare type EventSessionFactory = () => {
    callAction: <T>(agg: AggRoot, action: string, args: T) => void;
    getEvents: () => DomainEvent[];
};
export declare type EventSessionConstructor = (context: ContextType) => EventSessionFactory;
export declare const EventSession: EventSessionConstructor;
