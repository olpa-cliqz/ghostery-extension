/**
 * Test file for Tutorial View Action creators
 *
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2018 Ghostery, Inc. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as utils from '../../../utils';
import * as TutorialViewActions from '../TutorialViewActions';
import { INIT_TUTORIAL_PROPS, SET_TUTORIAL_NAVIGATION } from '../TutorialViewConstants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const testData = { test: true };
utils.sendMessageInPromise = jest.fn((name, message) => new Promise((resolve, reject) => {
	switch (name) {
		case INIT_TUTORIAL_PROPS: {
			resolve(message);
			break;
		}
		default: resolve(message);
	}
}));

describe('app/hub/Views/TutorialView/ actions', () => {
	test('initTutorialProps action should return correctly', () => {
		const initialState = {};
		const store = mockStore(initialState);

		const data = testData;
		const expectedPayload = { data, type: INIT_TUTORIAL_PROPS };

		return store.dispatch(TutorialViewActions.initTutorialProps(data)).then(() => {
			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		});
	});

	test('setTutorialNavigation action should return correctly', () => {
		const testData = {
			test: 'test-data',
		};
		expect(TutorialViewActions.setTutorialNavigation(testData)).toEqual({
			type: SET_TUTORIAL_NAVIGATION,
			data: testData,
		});
	});
});
