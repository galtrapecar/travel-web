import { memo } from 'react';
import { Icons } from '../../../../assets/icons';
import FlagIcon from '../../../../components/FlagIcon/FlagIcon';
import { Location, StayType } from '../../../../types';
import { formatTimeFromSeconds } from '../../../../utils/time';
import { useSetRecoilState } from 'recoil';
import { selectedCityDetailsAtom } from '../../state';

type TripCardProps = Location;

const TripCard = ({ city, stay }: TripCardProps) => {
  const setSelectedCityDetails = useSetRecoilState(selectedCityDetailsAtom);

  const getStayDetails = () => {
    if (!stay) return;

    if (stay.type === StayType.Overnight) {
      return (
        <>
          <Icons.BedIcon width={24} height={24} />
          {`${stay.duration} ${stay.duration === 1 ? 'night' : 'nights'}`}
        </>
      );
    }

    if (stay.type === StayType.MidDay) {
      return (
        <>
          <Icons.SunIcon width={24} height={24} />
          {`${stay.duration} ${stay.duration === 1 ? 'hour' : 'hours'}`}
        </>
      );
    }
  };

  if (!city) return null;
  if (!stay) return null;

  return (
    <div className="TripCard">
      <div className="TripCard__stats">
        <div className="TripCard__stat">
          <div className="TripCard__statLabel">
            Taking <Icons.CarIcon width={16} height={16} />
          </div>
          <div className="TripCard__statContent">
            {city.duration && (
              <div className="TripCard__statContentGroup">
                <Icons.ClockIcon width={24} height={24} />
                {formatTimeFromSeconds(city.duration)}
              </div>
            )}
            {city.distance && (
              <div className="TripCard__statContentGroup">
                <Icons.CarIcon width={24} height={24} />
                {`${Math.round(city.distance / 1000)} km`}
              </div>
            )}
            {!city.distance && !city.duration && (
              <div className="TripCard__statContentGroup">
                Data not available
              </div>
            )}
          </div>
        </div>
        <div className="TripCard__stat">
          <div className="TripCard__statLabel">Staying for</div>
          <div className="TripCard__statContent">
            <div className="TripCard__statContentGroup">{getStayDetails()}</div>
          </div>
        </div>
      </div>
      <div className="TripCard__thumbnail">
        <div
          className="TripCard__thumbnailImage"
          style={{ backgroundImage: `url(${city.image_url})` }}
          onClick={() => setSelectedCityDetails(city)}
        >
          <div className="TripCard__thumbnailImageOverlay">View details</div>
        </div>
        <div className="TripCard__thumbnailLabel">
          {city.city} <FlagIcon iso2={city.iso2} />
        </div>
      </div>
    </div>
  );
};

export default memo(TripCard);
