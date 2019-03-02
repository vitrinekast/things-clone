const dateFilters = ( type, attr ) => {
	switch ( type ) {

	case 'Log':
		return {
			project: false,
			tag: false,
			noProject: false,
			date: false,
			noDate: false
		};
		break;
	case 'Inbox':
		return {
			noProject: true,
			noDate: true,
			project: false,
			tag: false,
			date: false,
		};
		break;
	case 'Project':
		return {
			project: attr,
			noProject: false,
			noDate: false,
			tag: false,
			date: false,
		};
		break;
	case 'Someday':
		return {
			noProject: false,
			noDate: false,
			date: 'someday',
			project: false,
			tag: false,
		};
		break;
	case 'Today':
		return {
			noProject: false,
			date: 'today',
			project: false,
			tag: false,
			noDate: false
		};
		break;
	case 'Tomorrow':
		return {
			noProject: false,
			noDate: false,
			date: 'tomorrow',
			project: false,
			tag: false
		}
	}
}


export default dateFilters;
