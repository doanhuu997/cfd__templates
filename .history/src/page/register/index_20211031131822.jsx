import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import useFormValiDate from '../../core/useFormValiDate';
import { getDetail, getRegister } from '../../redux/reducers/coureseReducers'
import { useDispatch, useSelector } from 'react-redux'
import courseApi from '../../api/courseApi';
import { NotificationContainer, NotificationManager } from 'react-notifications';
function Notification() {
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    }
}
Notification()
export default function Register() {

    let { slug } = useParams();
    let dispatch = useDispatch()
    const khoahoc = useSelector(state => state.coures)
    let history = useHistory()
    useEffect(async () => {
        dispatch(getDetail(slug))
    }, [slug])

    const detail = khoahoc.Detail;
    const succces = khoahoc.succes;
    let { form, error, inputChang, check } = useFormValiDate({
        name: '',
        phone: '',
        email: '',
        fb: '',
        coin: '',
        payement: '',
        gender: 'female',
        gender2: '',

    }, {
        rule: {
            name: {
                required: true,

            },
            phone: {
                required: true,
                pattern: 'phone'
            },
            email: {
                required: true,
                pattern: 'email'
            },
            fb: {
                required: true,
                pattern: 'url'
            }
        },
        messager: {
            name: {
                required: "H??? v?? t??n kh??ng ???????c ????? tr???ng"
            }, phone: {
                required: "S??? ??i???n tho???i kh??ng ???????c ????? tr???ng"
            }, email: {
                required: "Email kh??ng ???????c ????? tr???ng"
            }
        }
    })
    function _btnRegister() {



        let error = check();
        if (Object.keys(error).length === 0) {
            // let res = await courseApi.register(form, slug)
            // console.log(res.success)
            dispatch(getRegister(form, slug))
            if (succces) {
                history.push(`/cfd__template/course/${slug}`)
            }
            // if (res.success) {
            //     history.push(`/course/${slug}`)
            // }

        }
    }

    function _payment() {
        // setForm({
        //     ...form,
        //    payement:this    
        // })

    }



    return (
        <main className="register-course" id="main">
            <section>
                <div className="container">
                    <div className="wrap container">
                        <div className="main-sub-title">????NG K??</div>
                        <h1 className="main-title"> {detail.title} </h1>
                        <div className="main-info">
                            <div className="date"><strong>Khai gi???ng:</strong> 15/11/2020</div>
                            <div className="time"><strong>Th???i l?????ng:</strong> 18 bu???i</div>
                            <div className="time"><strong>H???c ph??:</strong>{detail.money}</div>
                        </div>
                        <div className="form">
                            <label>
                                <p>H??? v?? t??n<span>*</span></p>
                                <input value={form.name} onChange={inputChang} type="text" placeholder="H??? v?? t??n b???n" name="name" />
                                {error.name ? <p className="error_form"> {error.name} </p> : null}
                            </label>
                            <label>
                                <p>S??? ??i???n tho???i<span>*</span></p>
                                <input value={form.phone} onChange={inputChang} type="text" placeholder="S??? ??i???n tho???i" name="phone" />
                                {error.phone ? <p className="error_form"> {error.phone} </p> : null}
                            </label>
                            <label>
                                <p>Email<span>*</span></p>
                                <input value={form.email} onChange={inputChang} type="text" placeholder="Email c???a b???n" name="email" />
                                {error.email ? <p className="error_form"> {error.email} </p> : null}
                            </label>
                            <label>
                                <p>URL Facebook<span>*</span></p>
                                <input value={form.fb} onChange={inputChang} type="text" placeholder="Email c???a b???n" name="fb" />
                                {error.fb ? <p className="error_form"> {error.fb} </p> : null}
                            </label>
                            <label className="disable">
                                <p>S??? d???ng COIN</p>
                                <div className="checkcontainer">
                                    Hi???n c?? <strong>300 COIN</strong>
                                    {/* Gi???m gi?? c??n <span><strong>5.800.000 VND</strong>, c??n l???i 100 COIN</span> */}
                                    {/* C???n ??t nh???t 200 COIN ????? gi???m gi?? */}
                                    <input type="checkbox" checked={form.coin} onChange={inputChang} name="coin" />
                                    <span className="checkmark" />
                                </div>
                            </label>
                            <label className="disable">
                                <p>S??? d???ng COIN</p>
                                <div className="checkcontainer">

                                    <input type="radio" value="male" name="gender" checked={form.gender === "male"} onChange={inputChang} /> Nam
                                    <span className="checkmark" />

                                </div>
                            </label>
                            <label className="disable">
                                <p>S??? d???ng COIN</p>
                                <div className="checkcontainer">

                                    <input type="radio" value="female" name="gender" checked={form.gender === "female"} onChange={inputChang} /> N???
                                    <span className="checkmark" />

                                </div>
                            </label>
                            <label className="disable">
                                <p>Kh??a</p>
                                <select name="gender2" id="" onChange={inputChang} >
                                    <option value="" selected={form.gender2 === ""} >-- Vui l??ng ch???n-- </option>
                                    <option value="basic" selected={form.gender2 === "basic"} >C?? b???n </option>
                                    <option value="advanced" selected={form.gender2 === "Advanced"}>N??ng cao </option>
                                </select>
                            </label>
                            <label>
                                <p>H??nh th???c thanh to??n</p>
                                <div className="select">
                                    <div className="head">Chuy???n kho???n</div>
                                    <div className="sub">
                                        <a href="#" data-value="chuyen-khoan" onClick={_payment.bind('chuyen-khoan')}>Chuy???n kho???n</a>
                                        <a href="#" data-value="tien-mat" onClick={_payment.bind('tien-matt')}>Thanh to??n ti???n m???t</a>
                                    </div>
                                </div>
                            </label>
                            <label>
                                <p>?? ki???n c?? nh??n</p>
                                <input type="text" placeholder="Mong mu???n c?? nh??n v?? l???ch b???n c?? th??? h???c." />
                            </label>
                            <div className="btn main rect" onClick={_btnRegister}>????ng k??</div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}