import mongoose from "mongoose";
import Product from "./Product";
import User from "./User";
import Order from "./Order";

const DashBoardSchema = new mongoose.Schema({
    totalUsers:{
        type:Number,
        default:0,
    },
    totalProducts:{
        type:Number,
        default:0,
    },
    totalOrders:{
        type:Number,
        default:0,
    },
    totalSales:{
        type:Number,
        default:0,
    },
    totalReviews:{
        type:Number,
        default:[],
    },
    totalDelivered:{
        type:Number,
        default:[],
    },
    totalCancelled:{
        type:Number,
        default:[],
    },
    totalPending:{
        type:Number,
        default:[],
    },
    totalShipped:{
        type:Number,
        default:[],
    },
    totalOrderByUser:{
        type:Array,
        default:[],
    },
    
},{timestamps : true});

const Dashboard = mongoose.models.Dashboard || mongoose.model('Dashboard', DashBoardSchema);

export default Dashboard;
