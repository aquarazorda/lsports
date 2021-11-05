import Utils from "./utils";
import * as TE from 'fp-ts/lib/TaskEither';

const correctData: TE.TaskEither<Error, SportEvent[]> = TE.right([{
    "SportName": "Football",
    "Location": "Germany",
    "League": "Bundesliga",
    "Teams Playing": "Bayern Munich - Dortmund",
    "Starting Time": Utils.generateDate(100),
    "Additional Data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}, {
    "SportName": "Football",
    "Location": "Germany",
    "League": "Bundesliga",
    "Teams Playing": "FC Koln - Union Berlin",
    "Starting Time": Utils.generateDate(1),
    "Additional Data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}, {
    "SportName": "Football",
    "Location": "Germany",
    "League": "Bundesliga",
    "Teams Playing": "Freiburg - Augsburg",
    "Starting Time": Utils.generateDate(4),
    "Additional Data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}, {
    "SportName": "Football",
    "Location": "Germany",
    "League": "Bundesliga",
    "Teams Playing": "Bochum - Hoffenheim",
    "Starting Time": Utils.generateDate(7),
    "Additional Data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}]);

const invalidData = TE.left(new Error("404 not found"));

export {
    correctData,
    invalidData
}