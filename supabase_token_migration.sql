-- Adds a daily token number to bookings, scoped to the appointment date (preferred_date).
-- Token numbers restart at 1 for each new date.

alter table bookings add column if not exists token_number integer;

create or replace function assign_token_number()
returns trigger as $$
begin
  select coalesce(max(token_number), 0) + 1
  into new.token_number
  from bookings
  where preferred_date = new.preferred_date;
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_token_number on bookings;

create trigger set_token_number
before insert on bookings
for each row
execute function assign_token_number();
