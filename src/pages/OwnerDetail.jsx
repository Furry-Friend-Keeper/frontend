import React from 'react'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
function OwnerDetail() {

const SizedAvatar = styled(Avatar)`
  ${({ size, theme }) => `
    width: ${theme.spacing(size)}rem; 
    height: ${theme.spacing(size)}rem; 
  `};
`;
  return (
    <>
        <div className="container pt-lg-4">
            <div className="col-12">
                <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 m-auto">
                            <div className="d-flex justify-content-center">
                                <SizedAvatar size="12" alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8 personal-info">
                            <h3>Personal info</h3>
                            <form className="form" role="form">
                                <div className="mb-3 row">
                                    <label className="col-lg-3 control-label">Name</label>
                                    <div className="col-lg-8">
                                    <input className="form-control" type="text" value="Jane" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-lg-3 control-label">Email</label>
                                    <div className="col-lg-8">
                                    <input className="form-control" type="email" value="janesemail@gmail.com" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-lg-3 control-label">Phone</label>
                                    <div className="col-lg-8">
                                    <input className="form-control" type="phone" value="089xxxxxxx" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-md-3 control-label">Username</label>
                                    <div className="col-md-8">
                                    <input className="form-control" type="text" value="janeuser" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
                    <h2>My Favorite Keeper</h2>
                </div>
            </div>
        </div>
    </>
  )
}

export default OwnerDetail