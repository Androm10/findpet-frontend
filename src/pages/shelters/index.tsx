import ShelterList from 'components/shelter/shelter-list';
import { ShelterEntity } from 'core/entities/shelter.entity';
import { FC } from 'react';

const SheltersPage: FC = () => {
  const shelters: ShelterEntity[] = [
    {
      id: 1,
      name: 'Pet home',
      coords: { latitude: 12, longitude: 12 },
      photos: [
        {
          name: 'photo',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
        },
        {
          name: 'photo',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
        },
        {
          name: 'photo',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
        },
        {
          name: 'photo',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
        },
        {
          name: 'photo',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
        },
      ],
      description: 'A home for every lost animal',
      contactPhone: '+880-555-35-35',
      contactEmail: 'email.contact@example.com',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Best HoMe',
      coords: { latitude: 999, longitude: 999 },
      photos: [
        {
          name: 'photo',
          url: 'https://www.peta.org/wp-content/uploads/2019/05/Tails-of-Courage-No-Kill-Rescue-4.jpg',
        },
      ],
      description: 'My Peet hoUwse is da besttt',
      contactPhone: '+666-66-66-66',
      contactEmail: 'george.bad@example.com',
      contactUrl: 'no-site.com',
      isVerified: false,
    },
  ];

  return (
    <div>
      <h1>Find a shelter with your best friend</h1>
      <ShelterList shelters={shelters} />
    </div>
  );
};

SheltersPage.displayName = 'SheltersPage';

export default SheltersPage;
