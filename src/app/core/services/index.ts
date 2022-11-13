import { ApartmentService } from '@smart/core/services/apartment.service';
import { MapService } from '@smart/core/services/map.service';
import { CommonService } from '../../shared/services/common.service';

export { ApartmentService } from '@smart/core/services/apartment.service';
export { MapService } from '@smart/core/services/map.service';

const Services: any = [ApartmentService, MapService];

export { Services };
