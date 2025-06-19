import EventClient from './EventClient';

export const dynamic = 'force-dynamic'; // optional but safe to keep

export default function EventPageWrapper() {
  return <EventClient />;
}
