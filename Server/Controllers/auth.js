"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.ProcessLoginPage = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (!user) {
            return res.json({ success: false, msg: 'ERROR: Authentication Failed' });
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            const authToken = (0, Util_1.GenerateToken)(user);
            return res.json({ success: true, msg: 'User Logged in Successfully!', user: {
                    id: user._id,
                    DisplayName: user.DisplayName,
                    username: user.username,
                    EmailAddress: user.EmailAddress
                }, token: authToken });
        });
        return;
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
            }
            else {
                console.error(err.name);
            }
            return res.json({ success: false, msg: err + 'ERROR: Registration Failed!' });
        }
        return res.json({ success: true, msg: 'User Registered Successfully!' });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logOut(function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log("User Logged Out");
    });
    res.json({ success: true, msg: 'User Lodged Out Successfully!' });
}
exports.ProcessLogoutPage = ProcessLogoutPage;
//# sourceMappingURL=auth.js.map