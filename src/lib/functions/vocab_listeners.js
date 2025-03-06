export const setup_sockets = async (
	socket,
	player,
	router,
	set_room,
	set_already_in_a_game,
	set_timer_pressed,
	set_gpc,
	set_grc,
	set_players,
	set_question_num,
	set_game_status
) => {
	//
	// ------------------ INITIAL EVENTS ------------------
	socket.emit('client_socket_set', player, router.query?.ROOM_ID);
	socket.on('initial_room_data', (room) => {
		set_room(room);
		console.log('room variable [ROOM_ID].tsx');
		console.log(room);
	});
	//
	// ------------------ PLAYER EVENTS ------------------
	socket.on('already_in_a_game', () => {
		set_already_in_a_game(true);
	});
	//
	// ------------------ GLOBAL EVENTS ------------------
	socket.on('player_count', (player_count, room_count) => {
		set_gpc(player_count);
		set_grc(room_count);
		console.log('The current player count is:', player_count);
	});
	//
	// ------------------ ROOM ONLY EVENTS ------------------
	socket.on('server_correct', (id) => {
		set_players((_players) => {
			const temp = { ..._players };
			typeof temp[id].points === 'number' ? (temp[id].points += 100) : '';
			return { ...temp };
		});
		set_question_num((num) => num + 1);
	});

	socket.on('server_incorrect', (id) => {
		set_players((_players) => {
			const temp = { ..._players };
			typeof temp[id].points === 'number' ? (temp[id].points -= 100) : '';
			return { ...temp };
		});
	});

	socket.on('server_timer_pressed', () => {
		set_timer_pressed((t) => !t);
	});

	socket.on('opponent_join', (p) => {
		p.points = 0;
		set_players((_players) => {
			return { ..._players, [p.id]: p };
		});
		console.log(`OPPONENT JOINED: Email = ${p.email}`);
	});

	socket.on('player_left', (player_id) => {
		set_players((_players) => {
			let copy = { ..._players };
			delete copy[player_id];
			return { ...copy };
		});
	});

	socket.on('clean_data_from_state', (player_id) => {
		set_players((prev) => {
			for (const player_id in prev) {
				prev[player_id].points = 0;
			}
			return prev;
		});
		set_question_num(1);
		set_game_status('ongoing');
	});
};
